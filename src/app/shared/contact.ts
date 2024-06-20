export class Contact {
    id: any;
    name!: string;
    email!: string;
    website!: string;
    projects: string[];
    image!: string;
    featured: boolean;
    constructor(id: any,projects: string[], featured: boolean) {
        this.id = id;
        this.projects = projects;
        this.featured = featured;
    }
}
