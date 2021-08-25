import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SearchComponent from './SearchComponent'
import MyShelfComponent from './MyShelfComponent'
import { get, update, getAll } from './BooksAPI.js'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  async componentDidMount() {
    await this.getAllBooks()
  }

  async fetchBook(bookId, shelfType) {
    await get(bookId).then((book) => {
      this.setState((prevState) => {
        return {
          books: prevState.books.concat({
            id: book.id,
            thumbnail: book.imageLinks.thumbnail,
            title: book.title,
            authors: book.authors && book.authors.join(', '),
            shelfType
          }).filter(x => x.id !== bookId || (x.id === bookId && x.shelfType === shelfType))
        }
      })
    })
  }

  async getAllBooks() {
    await getAll().then((books) => {
      this.setState({
        books: books.map((book) => ({
          id: book.id,
          thumbnail: book.imageLinks.thumbnail,
          title: book.title,
          authors: book.authors && book.authors.join(', '),
          shelfType: book.shelf
        }))
      });
    })
  }

  async updateBook(bookId, shelfType) {
    await update({ id: bookId }, shelfType).then((res) => {
      return this.fetchBook(bookId, shelfType)
    })
  }

  moveBookToShelf = (bookId, shelfType) => {
    const book = this.state.books.find(x => x.id === bookId)
    if (book === undefined || book.shelfType !== shelfType) {
      this.updateBook(bookId, shelfType)
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={() => <MyShelfComponent
            books={this.state.books}
            onMoveBookToShelf={this.moveBookToShelf}
          />}
        />
        <Route
          path='/search'
          render={() => <SearchComponent 
            books={this.state.books}
            onMoveBookToShelf={this.moveBookToShelf}
          />}
        />
      </div>
    )
  }
}

export default BooksApp
