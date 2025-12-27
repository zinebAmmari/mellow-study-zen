
import { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Paperclip,
  X,
  FileText,
  Image,
} from "lucide-react";
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
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Fonction pour convertir un fichier en base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Gestion de l'ajout de fichiers
  const handleFileUpload = async (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Vérifier la taille (limite à 5MB par fichier)
      if (file.size > 5 * 1024 * 1024) {
        alert(`Le fichier ${file.name} dépasse la taille maximale de 5MB`);
        continue;
      }

      try {
        const base64Data = await fileToBase64(file);

        newFiles.push({
          id: Date.now().toString() + i,
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64Data,
          uploadedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Erreur lors de la conversion du fichier:", error);
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);

    // Réinitialiser l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Supprimer un fichier de la liste
  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // Formatter la taille du fichier
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Obtenir l'icône selon le type de fichier
  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return <Image className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

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
                  files,
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
          files,
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
    setFiles([]);
    setEditingNote(null);
    setIsOpen(false);
  };

  const editNote = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setFiles(note.files || []);
    setIsOpen(true);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Supprimer un fichier d'une note existante
  const deleteFileFromNote = (noteId, fileId) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              files: (note.files || []).filter((f) => f.id !== fileId),
            }
          : note
      )
    );
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
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
                  className="min-h-48"
                />

                {/* Section fichiers */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Attached Files
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      Add Files
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                  </div>

                  {/* Liste des fichiers à attacher */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-sm font-medium truncate max-w-[200px]">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                            className="h-8 w-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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

              {/* Affichage des fichiers attachés */}
              {note.files && note.files.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Paperclip className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      Attachments ({note.files.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {note.files.slice(0, 3).map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-2 border rounded text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.type)}
                          <span className="truncate max-w-[120px]">
                            {file.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {formatFileSize(file.size)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFileFromNote(note.id, file.id)}
                            className="h-6 w-6"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {note.files.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        + {note.files.length - 3} more files
                      </p>
                    )}
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Updated{" "}
                {format(new Date(note.updatedAt), "MMM dd, yyyy 'at' HH:mm")}
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
