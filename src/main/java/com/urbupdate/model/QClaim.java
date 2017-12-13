package com.urbupdate.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QClaim is a Querydsl query type for Claim
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QClaim extends EntityPathBase<Claim> {

    private static final long serialVersionUID = -1019707158L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QClaim claim = new QClaim("claim");

    public final CollectionPath<Adjustment, QAdjustment> adjustments = this.<Adjustment, QAdjustment>createCollection("adjustments", Adjustment.class, QAdjustment.class, PathInits.DIRECT2);

    public final DateTimePath<java.util.Date> createdAt = createDateTime("createdAt", java.util.Date.class);

    public final StringPath description = createString("description");

    public final StringPath epannelage = createString("epannelage");

    public final NumberPath<Integer> etatAvancement = createNumber("etatAvancement", Integer.class);

    public final QFeature feature;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final CollectionPath<Photo, QPhoto> photos = this.<Photo, QPhoto>createCollection("photos", Photo.class, QPhoto.class, PathInits.DIRECT2);

    public final BooleanPath planification = createBoolean("planification");

    public final StringPath titre = createString("titre");

    public final StringPath type = createString("type");

    public final DateTimePath<java.util.Date> updatedAt = createDateTime("updatedAt", java.util.Date.class);

    public final QUser user;

    public QClaim(String variable) {
        this(Claim.class, forVariable(variable), INITS);
    }

    public QClaim(Path<? extends Claim> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QClaim(PathMetadata metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QClaim(PathMetadata metadata, PathInits inits) {
        this(Claim.class, metadata, inits);
    }

    public QClaim(Class<? extends Claim> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.feature = inits.isInitialized("feature") ? new QFeature(forProperty("feature"), inits.get("feature")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

