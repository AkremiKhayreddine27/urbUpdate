package com.urbupdate.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QLayer is a Querydsl query type for Layer
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QLayer extends EntityPathBase<Layer> {

    private static final long serialVersionUID = -1011700225L;

    public static final QLayer layer = new QLayer("layer");

    public final BooleanPath active = createBoolean("active");

    public final StringPath color = createString("color");

    public final DateTimePath<java.util.Date> created_at = createDateTime("created_at", java.util.Date.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath stroke = createString("stroke");

    public final DateTimePath<java.util.Date> updated_at = createDateTime("updated_at", java.util.Date.class);

    public QLayer(String variable) {
        super(Layer.class, forVariable(variable));
    }

    public QLayer(Path<? extends Layer> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLayer(PathMetadata metadata) {
        super(Layer.class, metadata);
    }

}

