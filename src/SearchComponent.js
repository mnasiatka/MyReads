import React,  { Component } from "react";
import { Link } from 'react-router-dom';
import { search } from './BooksAPI.js'
import BookItemComponent from "./BookItemComponent.js";
import { BookShelfStatus } from "./enums.js";
import { getBookImage } from './constants.js';
import * as _ from 'lodash'

export default class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchedBooks: []
        }

        this.searchForBooks = _.debounce(this.searchForBooks, 250)
    }

    searchForBooks = async (searchTerm) => {
        await search(searchTerm).then((res) => {
            if (res.error) {
                this.setState({ error: res.error, searchedBooks: [] });
                return;
            }

            this.setState({ 
                searchedBooks: res.map(x => {
                    var book = this.props.books.find(book => book.id === x.id);
                    return {
                        id: x.id,
                        thumbnail: getBookImage(x),
                        title: x.title,
                        authors: x.authors && x.authors.join(', '),
                        shelfType: book !== undefined ? book.shelfType : BookShelfStatus.None
                    }
                }),
                error: false
            })
        });
    }

    onSearchChange = async (e) => {
        const searchTerm = e.target.value;
        this.setState({ searchTerm });

        if (searchTerm.length) {
            this.searchForBooks(searchTerm)
        }
        else {
            this.setState({ searchedBooks: [], error: false })
        }
    }

    onMoveBookToShelf = (bookId, shelfType) => {
        this.props.onMoveBookToShelf(bookId, shelfType);

        this.setState((prevState) => ({
            searchedBooks: prevState.searchedBooks.map(x => x.id === bookId ? Object.assign({}, x, { shelfType }) : x)
        }));
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/'>
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={this.onSearchChange} value={this.state.searchTerm}/>
                </div>
                </div>
                <div className="search-books-results">
                    { this.state.error && <div>
                        Could not find any books with given search term    
                    </div>}
                    <ol className="books-grid">
                        {this.state.searchedBooks.map((book) => (
                            <li key={book.id}>
                                <BookItemComponent 
                                    key={book.id}
                                    bookId={book.id}
                                    imageSource={book.thumbnail} 
                                    title={book.title}
                                    author={book.authors}
                                    shelfType={book.shelfType}
                                    onMoveBookToShelf={this.onMoveBookToShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>

            </div>
        )
    }
}