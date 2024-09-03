package com.project_14.OnlineBankingSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDate createdAt;

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customerId", nullable = false)
    @JsonBackReference
    private Customer customer;
}
