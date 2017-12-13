package com.urbupdate.repositories;

import com.querydsl.core.types.dsl.StringPath;
import com.urbupdate.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.query.Param;
import com.urbupdate.model.QClaim;

import java.util.List;


public interface ClaimsRepository extends JpaRepository<Claim, Integer>,QueryDslPredicateExecutor<Claim>,QuerydslBinderCustomizer<QClaim>{
    public List<Claim> findAllByOrderByUpdatedAtDesc();
    public List<Claim> findByType(@Param("type") String type);
    public List<Claim> findByEtatAvancement(@Param("etat_avancement") String etat_avancement);
    public List<Claim> findByTypeOrPlanification(@Param("type") String type,@Param("planification") boolean planification);
    public List<Claim> findByEpannelage(@Param("epannelage") String epannelage);

    @Override
    default public void customize(QuerydslBindings bindings, QClaim claim) {
        bindings.bind(claim.type).first(
                (path, value) -> path.equalsIgnoreCase(value)); // 1
        bindings.bind(String.class).first(
                (StringPath path, String value) -> path.containsIgnoreCase(value)); // 2
        bindings.excluding(claim.user);
    }
}
