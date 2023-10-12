package step.learning.ioc;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.name.Names;
import step.learning.services.formparse.FormParseService;
import step.learning.services.formparse.MixedFormParseService;
import step.learning.services.hash.*;
import step.learning.services.random.*;

public class ServicesModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(HashService.class).annotatedWith(Names.named("Digest-Hash")).to(Sha256HashService.class);
        bind(HashService.class).annotatedWith(Names.named("DSA-Hash")).to(Md5HashService.class);
        
        bind(FormParseService.class).to(MixedFormParseService.class);
    }

    private RandomService randomService;

    @Provides
    private RandomService randomService() {
        /*
        Провайдери - методи, які дозволяють більш гнучко керувати процесом
        інжекції залежностей. Зв'язується за типом даних - включається для
        кожної точки інжекції з типом RandomService. У якості інжектованого
        об'єкту буде те, що поверне даний метод. Назва методу - не має значення
        тільки тип повернення
         */
        if (randomService == null) {
            randomService = new RandomServiceV1();
            randomService.seed("0"); // як приклад того що самого конструктора недостатньо
        }
        return randomService;
    }
}
