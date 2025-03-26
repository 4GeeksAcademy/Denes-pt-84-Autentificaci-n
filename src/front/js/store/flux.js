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
			User:{
				name:"",
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
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
				const resp = await fetch(process.env.BACKEND_URL + "register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userData })
				})

				if (!resp.ok) throw Error("Hubo un problema con la petición de /register")

				if (resp.status === 400) {
					throw ("Hubo un problema con los datos enviados para el registro")
				}

				const data = await resp.json()
				console.log('mi registro', data)
			},

			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
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

			setUser: (data) => {
				const store = getStore();
				setStore({ ...store, ...data })
			},

			logout: async () => {
				localStorage.removeItem("token")
				setStore({ user: [] })
			}
		}
	};
};

export default getState;
