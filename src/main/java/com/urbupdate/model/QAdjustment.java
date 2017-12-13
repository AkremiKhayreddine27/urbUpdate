package com.urbupdate.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAdjustment is a Querydsl query type for Adjustment
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAdjustment extends EntityPathBase<Adjustment> {

    private static final long serialVersionUID = 590827903L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAdjustment adjustment = new QAdjustment("adjustment");

    public final QClaim claim;

    public final DateTimePath<java.util.Date> createdAt = createDateTime("createdAt", java.util.Date.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath new_version = createString("new_version");

    public final StringPath old_version = createString("old_version");

    public final DateTimePath<java.util.Date> updatedAt = createDateTime("updatedAt", java.util.Date.class);

    public final QUser user;

    public QAdjustment(String variable) {
        this(Adjustment.class, forVariable(variable), INITS);
    }

    public QAdjustment(Path<? extends Adjustment> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QAdjustment(PathMetadata metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QAdjustment(PathMetadata metadata, PathInits inits) {
        this(Adjustment.class, metadata, inits);
    }

    public QAdjustment(Class<? extends Adjustment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.claim = inits.isInitialized("claim") ? new QClaim(forProperty("claim"), inits.get("claim")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

