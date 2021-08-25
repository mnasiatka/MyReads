import React from "react";
import {  Link } from 'react-router-dom'
import ShelfComponent from './ShelfComponent'
import {ShelfType} from './enums.js'

export default function MyShelfComponent(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
            <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
                {Object.values(ShelfType).map((ShelfTypeId) => 
                    <ShelfComponent 
                        key={ShelfTypeId}
                        shelfType={ShelfTypeId}
                        onMoveBookToShelf={props.onMoveBookToShelf}
                        books={props.books.filter(x => x.shelfType === ShelfTypeId)}
                    />
                )}
                </div>
            </div>
            <Link to='/search'>
                <div className="open-search">
                    <button>Add a book</button>
                </div>
            </Link>
        </div>
    )
}