package step.learning.dto.enitities;

import java.util.Date;

public class User {
    private String id;
    private String name;
    private String salt;
    private String passDK; // RFC-2898 DK - derived key
    private String email;
    private Date birthdate;
    private String avatarUrl;
}
