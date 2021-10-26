

export interface Question{
  title: string;
  content: string;
  votes: number;
  tags: string[];
  createdBy: string;
  questionId: string;
}


// export class Question {
//   title: string;
//   content: string;
//   votes: number;
//   tags: string[];
//   createdBy: string;
//
//     constructor(title : string, content : string, votes: number, tags : string[], createdBy: string) {
//       this.title = title;
//       this.content = content;
//       this.votes = votes;
//       this.tags = tags;
//       this.createdBy = createdBy;
//
//     }
//
//
// }
