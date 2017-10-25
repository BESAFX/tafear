package com.besafx.app.entity.enums;

public enum CloseType {
    Pending("تحت التنفيذ"),
    Auto("تلقائي"),
    Manual("ارشيف");
    private String name;
    CloseType(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static CloseType findByName(String name){
        for(CloseType v : values()){
            if( v.getName().equals(name)){
                return v;
            }
        }
        return null;
    }
    public static CloseType findByValue(String value){
        for(CloseType v : values()){
            if( v.name().equals(value)){
                return v;
            }
        }
        return null;
    }
}
