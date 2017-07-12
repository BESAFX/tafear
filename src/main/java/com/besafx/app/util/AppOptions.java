package com.besafx.app.util;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AppOptions {
    private Boolean activateWarnMessage;
    private Boolean activateDeductionMessage;
}
