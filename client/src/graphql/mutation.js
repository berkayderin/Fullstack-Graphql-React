import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
	mutation AddBook($title: String!, $author: String!, $publicationYear: Int, $genre: String) {
		addBook(title: $title, author: $author, publicationYear: $publicationYear, genre: $genre) {
			id
			title
			author
			publicationYear
			genre
		}
	}
`

export const DELETE_BOOK = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id)
	}
`

export const UPDATE_BOOK = gql`
	mutation UpdateBook($id: ID!, $title: String!, $author: String!, $publicationYear: Int, $genre: String) {
		updateBook(id: $id, title: $title, author: $author, publicationYear: $publicationYear, genre: $genre) {
			id
			title
			author
			publicationYear
			genre
		}
	}
`
