import React, { Component } from "react";
import { BookShelfStatus } from './enums.js'
import PropTypes from 'prop-types';

export default class BookItemComponent extends Component {

    onMoveBookToShelf = (e) => this.props.onMoveBookToShelf(this.props.bookId, e.target.value);

    render() {
        return (
        <div className="book p-2">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${this.props.imageSource}")` }}></div>
                <div className="book-shelf-changer">
                    <select  value={this.props.shelfType || BookShelfStatus.None} onChange={this.onMoveBookToShelf}>
                        <option value={BookShelfStatus.Move} disabled>Move to...</option>
                        <option value={BookShelfStatus.CurrentlyReading}>Currently Reading</option>
                        <option value={BookShelfStatus.WantToRead}>Want to Read</option>
                        <option value={BookShelfStatus.HaveRead}>Read</option>
                        <option value={BookShelfStatus.None}>None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.author}</div>
        </div>
        )
    }
}

BookItemComponent.propTypes = {
    onMoveBookToShelf: PropTypes.func.isRequired
}