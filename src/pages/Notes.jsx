

import { useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format } from "date-fns";

const Notes = () => {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [isOpen, setIsOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const saveNote = () => {
    if (title.trim() && content.trim()) {
      if (editingNote) {
        setNotes(
          notes.map((n) =>
            n.id === editingNote.id
              ? {
                  ...n,
                  title,
                  subject,
                  content,
                  updatedAt: new Date().toISOString(),
                }
              : n
          )
        );
      } else {
        const note = {
          id: Date.now().toString(),
          title,
          subject,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setNotes([...notes, note]);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubject("");
    setContent("");
    setEditingNote(null);
    setIsOpen(false);
  };

  const editNote = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setIsOpen(true);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Notes</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingNote ? "Edit Note" : "Create New Note"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Subject (e.g., Math, Science)..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  placeholder="Write your notes here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-64"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button onClick={saveNote}>
                    {editingNote ? "Update" : "Save"} Note
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Card
              key={note.id}
              className="p-6 card-shadow smooth-transition hover:card-shadow-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
                  {note.subject && (
                    <span className="text-sm text-primary">{note.subject}</span>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editNote(note)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNote(note.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-4 mb-3">
                {note.content}
              </p>
              <p className="text-xs text-muted-foreground">
                Updated {format(new Date(note.updatedAt), "MMM dd, yyyy")}
              </p>
            </Card>
          ))}
          {notes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No notes yet. Create your first note! 📚
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
