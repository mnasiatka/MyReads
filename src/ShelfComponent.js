import React from "react";
import BookItemComponent from './BookItemComponent'
import {  ShelfTypeString } from "./enums.js";


export default function ShelfComponent(props) {
    return (
        <div className="bookshelf">
                <h2 className="bookshelf-title">{ShelfTypeString[props.shelfType]}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book) => (
                        <li key={book.id}>
                            <BookItemComponent 
                                key={book.id}
                                bookId={book.id}
                                imageSource={book.thumbnail} 
                                title={book.title}
                                author={book.authors}
                                shelfType={props.shelfType}
                                onMoveBookToShelf={props.onMoveBookToShelf}
                            />
                        </li>
                    ))}
                </ol>
                </div>
            </div>
    )
}