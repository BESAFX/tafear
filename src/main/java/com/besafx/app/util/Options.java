package com.besafx.app.util;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Options implements Serializable {

    private static final long serialVersionUID = 1L;

    private String lang;
    private String dateType;
}
