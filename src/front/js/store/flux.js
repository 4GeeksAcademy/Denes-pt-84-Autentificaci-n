const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			User: {
				name: "",
				email: "",
				password: ""

			},
			profile: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			register: async (userData) => {
				console.log(userData)
				try {

					const resp = await fetch("https://animated-waffle-q795g5w5wgqg24569-3001.app.github.dev/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(userData)
					})

					if (!resp.ok) throw Error("Hubo un problema con la petición de /register")

					if (resp.status === 400) {
						throw ("Hubo un problema con los datos enviados para el registro")
					}

					const data = await resp.json()
					console.log('mi registro', data)
					return true

				} catch (error) {
					console.error('error en el registro', error.message)
					return false
				}
			},

			login: async (dataLogin) => {
				try {
					const resp = await fetch("https://animated-waffle-q795g5w5wgqg24569-3001.app.github.dev/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(dataLogin)
					})
					if (!resp.ok) {
						const errorData = await resp.json()
						throw new Error(errorData.message || "Error en la autenticación")
					}

					const data = await resp.json()
					localStorage.setItem("token", data.token);


					return data;
				} catch (error) {
					console.error("Error en login:", error.message)
					return false
				}
			},

			private: async () => {
				const token = localStorage.getItem("token");
				if (!token) {
					return null;
				}

				try {
					const resp = await fetch(process.env.BACKEND_URL + "/private", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
					});
					if (!resp.ok) throw new Error("No autorizado");

					const data = await resp.json();
					setStore({ profile: data.user });
					console.log(data)
					return data.user;
				} catch (error) {
					console.error(error);
					setStore({ profile: null });
					return null;
				}
			},

			setUser: (data) => {
				const store = getStore();
				setStore({ ...store, User: { ...store.User, ...data } });
			},

			logout: async () => {
				localStorage.removeItem("token")
				setStore({ User: { name: "", email: "", password: "" } })
			}
		},
	};
};

export default getState;
