const empleadoDB = require('../models/empleadoModel');
const jwt = require('jsonwebtoken');

loginUsuario = async (req, res) => { 
	const { usuario, contraseña } = req.body;
	try {
	  let rowLogin = await empleadoDB.login(usuario, contraseña);
  
	  if (rowLogin.length === 0) {
		const responseError = {
		  code: 401,
		  mensaje: 'Credenciales inválidas',
		};
		return res.status(401).json(responseError);
	  }
	  const accessToken = jwt.sign({ usuario, contraseña }, 'secret', { expiresIn: '1h' });
	  const response = {
		accessToken,
		code: 200,
		mensaje: 'Inicio de sesión exitoso',
	  };
	  return res.status(200).json(response);
	} catch (err) {
	  const responseError = {
		code: 500,
		mensaje: err.sqlMessage,
		result: err,
	  };
	  res.status(500).json(responseError);
	}
  };

  listarEmpleados = async (req, res) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
	  const query = `SELECT * FROM empleado`;
	  const rowsEmpleados = await connection.executeQuery(query, []);
	  return rowsEmpleados;
	} catch (err) {
	  console.log(err);
	  throw err;
	} finally {
	  connection.close();
	}
  };

registrarEmpleado = async (req, res) => {
	const empleData = req.body;

	try {
		await empleadoDB.registraEmpleado(empleData);

		const response = {
			code: 200,
			mensaje: 'Empleado agregado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};


actualizarEmpleado = async (req, res) => {
	const empleadoData = req.body;
  
	try {
	  await empleadoDB.actualizaEmpleado(empleadoData);
  
	  const response = {
		code: 200,
		mensaje: 'Empleado actualizado correctamente',
	  };
  
	  return res.status(200).json(response);
	} catch (err) {
	  console.error("Error al actualizar empleado:", err);
	  res.status(500).json({ mensaje: "Hubo un problema al actualizar el empleado" });
	}
  };
  




listarCountUsuariosPorGrupo = async (req, res) => {
	const data = req.body;
	try {
		let countUsuarios = await usuarioDB.getCountUsuariosPorGrupo(data);

		const response = {
			code: 200,
			mensaje: 'Usuarios contados correctamente',
			data: countUsuarios,
		};

		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
		return;
	}
};

buscarPorIdUsuario = async (req, res) => {
	const userData = req.body;

	try {
		let rowUsuario = await usuarioDB.buscaPorIdUsuario(userData);

		const response = {
			code: 200,
			mensaje: 'Usuario listado correctamente',
			data: rowUsuario,
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

eliminarUsuario = async (req, res) => {
	const userData = req.body;

	try {
		await usuarioDB.eliminaUsuario(userData);

		const response = {
			code: 200,
			mensaje: 'El campo activo cambio a número 2',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	loginUsuario,
	listarEmpleados,
	registrarEmpleado,
	buscarPorIdUsuario,
	actualizarEmpleado,
	eliminarUsuario,
	listarCountUsuariosPorGrupo,
};
