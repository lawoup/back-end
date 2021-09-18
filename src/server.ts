import ProjectRoute from '~/routes/project.route';

require('dotenv-safe').config();
import App from '~/app';
import IndexRoute from '~/routes/index.route';
import UserRoute from '~/routes/user.route';
import validateEnv from '~/utils/validateEnv';
import RoleRoute from '~/routes/role.route';

validateEnv();

const app = new App([
	new IndexRoute(),
	new UserRoute(),
	new ProjectRoute(),
	new RoleRoute(),
]);

app.listen();
