package com.besafx.app.entity.enums;

public enum Importance {
    Regular("عادية"),
    Important("متوسطة"),
    Critical("عاجلة");
    private String name;
    Importance(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static Importance findByName(String name){
        for(Importance v : values()){
            if( v.getName().equals(name)){
                return v;
            }
        }
        return null;
    }
    public static Importance findByValue(String value){
        for(Importance v : values()){
            if( v.name().equals(value)){
                return v;
            }
        }
        return null;
    }
}
