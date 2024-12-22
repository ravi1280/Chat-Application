
package entity;

import com.sun.xml.rpc.processor.modeler.j2ee.xml.string;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User implements Serializable{

  
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    
    @Column(name = "mobile",length = 10,nullable = false)
    private String mobile;
    
    @Column(name = "fname",length = 45,nullable = false)
    private String  Fname;
    
    @Column(name = "lname",length = 45, nullable = false)
    private String  Lname;
    
    @Column(name = "password",length = 45, nullable = false)
    private String  password;
    
    @Column(name = "joinDate")
    private Date joinDate;
    
    @ManyToOne
    @JoinColumn(name = "user_status_id")
    private UserStatus userSatus;
    
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
    
    

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getFname() {
        return Fname;
    }

    public void setFname(String Fname) {
        this.Fname = Fname;
    }

    public String getLname() {
        return Lname;
    }

    public void setLname(String Lname) {
        this.Lname = Lname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public UserStatus getUserSatus() {
        return userSatus;
    }

    public void setUserSatus(UserStatus userSatus) {
        this.userSatus = userSatus;
    }
    
      public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
    
    
    
}
