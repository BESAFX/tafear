package com.besafx.app.util;
import com.besafx.app.entity.enums.CloseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AppOptions {

    //
    private Boolean activateWarnMessage;

    private Boolean activateDeductionMessage;

    //
    private List<Long> emailDeductionPersonsList;

    private CloseType emailDeductionCloseType;

    private String emailDeductionEmails;

    private String emailDeductionTitle;

    private String emailDeductionBody;
    //
}
