package com.blackcoffee.springbootlibrary.dao;

import com.blackcoffee.springbootlibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
