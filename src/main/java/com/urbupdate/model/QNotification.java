package com.urbupdate.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QNotification is a Querydsl query type for Notification
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QNotification extends EntityPathBase<Notification> {

    private static final long serialVersionUID = -158257027L;

    public static final QNotification notification = new QNotification("notification");

    public final StringPath data = createString("data");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final SimplePath<Notifiable> notifiable = createSimple("notifiable", Notifiable.class);

    public QNotification(String variable) {
        super(Notification.class, forVariable(variable));
    }

    public QNotification(Path<? extends Notification> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNotification(PathMetadata metadata) {
        super(Notification.class, metadata);
    }

}

