module.exports = {
	apps : [{
		name: "app",
		script: "./app.js",
		exec_mode: "cluster",
		instances: 2,
		wait_ready: true
		//cron_restart: "15 3 * * *",
	}]
}
