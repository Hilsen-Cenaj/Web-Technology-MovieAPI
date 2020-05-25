package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;


@Entity
@IdClass(Bookmark.class)
public class Bookmark  implements Serializable {
    @Id
    private int userid;
    @Id
    private String title;
    @Column
    private String code;

    public Bookmark() {
    }
    public Bookmark(int userid,String title,String code){
        this.userid=userid;
        this.title=title;
        this.code=code;
    }

    @Override
    public String toString() {
        return "Bookmark{" +
                "userid=" + userid +
                ", title='" + title + '\'' +
                '}';
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
