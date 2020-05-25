package com.example.demo.entity;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookmarkRepository extends CrudRepository<Bookmark,Integer> {
    @Query("select b from Bookmark b where b.userid= :userid")
    List<Bookmark> findBookmarksByUserid(@Param("userid") int userid);

    @Query("select b from Bookmark b where b.userid= :userid and b.title= :title")
    Bookmark findBookmarksByUseridAndTitle(@Param("userid") int userid,@Param("title") String title);



}
