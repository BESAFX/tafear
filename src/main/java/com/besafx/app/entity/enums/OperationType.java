package com.besafx.app.entity.enums;

public enum OperationType {
    Comment("تعليق"),
    IncreaseEndDate("تمديد تاريخ إستلام"),
    DecreaseEndDate("تعجيل تاريخ إستلام"),
    CloseTaskOnPerson("إغلاق المهمة لموظف"),
    CloseTaskCompletely("أرشفة المهمة"),
    CloseTaskAuto("إغلاق تلقائي"),
    AddPerson("تحويل"),
    RemovePerson("حذف موظف"),
    AcceptCloseRequest("قبول طلب إغلاق"),
    AcceptIncreaseEndDateRequest("قبول طلب تمديد"),
    AcceptDecreaseEndDateRequest("قبول طلب تعجيل"),
    DeclineCloseRequest("رفض طلب إغلاق"),
    DeclineIncreaseEndDateRequest("رفض طلب تمديد"),
    DeclineDecreaseEndDateRequest("رفض طلب تعجيل"),
    OpenTaskOnPersonAuto("فتح المهمة على موظف تلقائي"),
    OpenTaskOnPerson("فتح المهمة على موظف");
    private String name;
    OperationType(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static OperationType findByName(String name){
        for(OperationType v : values()){
            if( v.getName().equals(name)){
                return v;
            }
        }
        return null;
    }
    public static OperationType findByValue(String value){
        for(OperationType v : values()){
            if( v.name().equals(value)){
                return v;
            }
        }
        return null;
    }
}
