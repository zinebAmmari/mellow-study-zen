// export type Priority = 'high' | 'medium' | 'low';

// export interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
//   priority: Priority;
//   dueDate?: string;
//   category?: string;
// }

// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   subject: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface StickyNote {
//   id: string;
//   content: string;
//   color: string;
//   position: { x: number; y: number };
// }

// export interface DailyGoal {
//   id: string;
//   goal: string;
//   completed: boolean;
//   date: string;
// }

/**
 * @typedef {'high' | 'medium' | 'low'} Priority
 * Représente le niveau de priorité d'une tâche.
 */

/**
 * @typedef {object} Task
 * @property {string} id - Identifiant unique de la tâche.
 * @property {string} title - Titre de la tâche.
 * @property {boolean} completed - État d'achèvement de la tâche.
 * @property {Priority} priority - Priorité de la tâche ('high', 'medium', 'low').
 * @property {string} [dueDate] - Date d'échéance optionnelle.
 * @property {string} [category] - Catégorie optionnelle.
 */

/**
 * @typedef {object} Note
 * @property {string} id - Identifiant unique de la note.
 * @property {string} title - Titre de la note.
 * @property {string} content - Contenu principal de la note.
 * @property {string} subject - Sujet ou catégorie de la note.
 * @property {string} createdAt - Date et heure de création (au format chaîne).
 * @property {string} updatedAt - Date et heure de la dernière modification (au format chaîne).
 */

/**
 * @typedef {object} StickyNote
 * @property {string} id - Identifiant unique de la note adhésive.
 * @property {string} content - Contenu du pense-bête.
 * @property {string} color - Couleur du pense-bête (ex: 'yellow', '#FFD700').
 * @property {object} position - Position de la note sur l'écran.
 * @property {number} position.x - Coordonnée X.
 * @property {number} position.y - Coordonnée Y.
 */

/**
 * @typedef {object} DailyGoal
 * @property {string} id - Identifiant unique de l'objectif.
 * @property {string} goal - Description de l'objectif quotidien.
 * @property {boolean} completed - État d'achèvement de l'objectif.
 * @property {string} date - Date à laquelle l'objectif est fixé (au format chaîne).
 */
