import { Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { CollectionReference, DocumentData, collection } from "@firebase/firestore";

@Injectable ({
    providedIn: 'root'
})

export class BooksService {
    private booksCollection: CollectionReference<DocumentData>;

    constructor(
        private readonly firestore: Firestore
    )
    {}

    getBooks () {
        this.booksCollection = collection(this.firestore, 'books');

        return collectionData(this.booksCollection, {
            idField: 'id',
        });
    }
}