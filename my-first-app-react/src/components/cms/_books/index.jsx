"use client";
import React, { useState } from "react";
import { ListBooks } from "../../../const/ListBooks";
import { CardCalculates } from "../components/card_calculates";
import { Header } from "./components/header";
import Tabledata from "./components/tabledata";
import { openModal } from "@/components/ui/modals";
import BookForm from "./components/form";

export function MBooks() {
  const [books, setBooks] = useState(ListBooks);

  const handleAddNewBook = () => {
    openModal({
      header: "Add New Book",
      message: (
        <BookForm
          onSubmit={(data) => {
            const newBook = {
              id: Date.now(),
              title: data.bookTitle,
              author: data.authorName,
              language: "Indonesian",
              rating: Math.floor(Math.random() * 5) + 1,
              views: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
              is_free: data.isFree,
              sinopsis: data.sinopsis,
              story: data.story,
              img: data.coverImage
                ? URL.createObjectURL(data.coverImage)
                : "https://via.placeholder.com/150",
            };
            setBooks((prevBooks) => [...prevBooks, newBook]);
            alert("Buku berhasil ditambahkan!");
            openModal({ open: false });
          }}
          onCancel={() => openModal({ open: false })}
        />
      ),
      size: "xl",
      closable: true,
    });
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };


  const handleEditBook = (bookToEdit) => {
    openModal({
      header: "Edit Book",
      message: (
        <BookForm
          initialData={bookToEdit}
          onSubmit={(data) => {
            setBooks((prevBooks) =>
              prevBooks.map((b) =>
                b.id === bookToEdit.id
                  ? {
                      ...b,
                      title: data.bookTitle,
                      author: data.authorName,
                      is_free: data.isFree,
                    }
                  : b,
              ),
            );
            alert("Data buku berhasil diperbarui!");
            openModal({ open: false });
          }}
          onCancel={() => openModal({ open: false })}
        />
      ),
      size: "xl",
      closable: true,
    });
  };

  return (
    <div className="container-fluid">
      <Header handleAdd={handleAddNewBook} />

      <div className="row">
        <div className="col-md-3">
          <CardCalculates
            title={`Total Books`}
            value={books.length}
            icon={`book`}
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title={`Free Book`}
            value={books.filter((b) => !b.is_free).length}
            icon={`grid`}
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title={`Subscribe`}
            value={books.filter((b) => b.is_free).length}
            icon={`calendar-event`}
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title={`Authors`}
            value={books.filter((b) => b.author).length}
            icon={`people`}
          />
        </div>
      </div>

      <Tabledata
        data={books}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default MBooks;
