import { App } from '@engine/app';
import { initFeeds } from '@app/data/feeds';
import { getProperty } from '@engine/config';
import { feedsController } from '@app/controllers/feeds';

const app = new App([feedsController]);

// Configuration is loaded during application instantiating.
// Here we initialize domain.
initFeeds();

// Finally start to listen port.
app.listen(getProperty('applicationPort'));