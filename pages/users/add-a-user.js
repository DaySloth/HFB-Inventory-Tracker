import Head from "next/head";
import { useEffect, useState } from "react";
import {
	Button,
	Form,
	Message,
	Checkbox,
	Header,
	Icon,
} from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import NavHeader from "../../components/header";
import { useSession } from "next-auth/client";
import Loader from "../../components/loader";

export default function SignUp() {
	const [session, loading] = useSession();

	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [tempPassword, setTempPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState();
	const [pageMessage, setPageMessage] = useState();

	const [buttonLoading, setButtonLoading] = useState(false);

	useEffect(() => {
		if (confirmPassword) {
			if (confirmPassword !== password) {
				setPasswordError("Passwords do not match");
			} else if (confirmPassword === password) {
				setPasswordError("");
			}
		} else {
			setPasswordError("");
		}
	}, [confirmPassword]);

	const createUser = async (event) => {
		event.preventDefault();
		setPageMessage("");
		setButtonLoading(!loading);
		if (
			!passwordError &&
			first_name &&
			last_name &&
			email &&
			password &&
			confirmPassword
		) {
			//call to create user
			let newUser = {
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password,
				tempPassword: tempPassword,
			};

			try {
				const data = await axios.post("/api/mobile/users/create", newUser);
				setButtonLoading(false);
				// if (newUser.status) {
				//   if (newUser.status === 400) {
				//     //set error message
				//     setPageMessage({
				//       color: "red",
				//       message: newUser.msg,
				//     });
				//   } else if (newUser.status === 200) {
				//     //set success message
				//     clearForm();
				//     setPageMessage({
				//       color: "green",
				//       message: newUser.msg,
				//     });
				//   }
				// }
			} catch (error) {
				//set error message
				setButtonLoading(false);
				setPageMessage({
					color: "red",
					message: "A server error occured, please try again in a minute",
				});
			}
		} else {
			//error
			setPageMessage({
				color: "red",
				message: "Please finish filling out the form",
			});
			setButtonLoading(false);
		}
	};

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setPasswordError("");
		setPageMessage("");
		setTempPassword(false);
	};

	return (
		<>
			{loading && <Loader />}
			{session && (
				<>
					<Head>
						<title>HFB Mobile Manager</title>
					</Head>

					<NavHeader />

					<div className={styles.center}>
						<Header as="h2" icon>
							<Icon name="add user" />
							Add a User
						</Header>
					</div>

					<hr />

					<div className={styles.container}>
						<Form>
							<Form.Input
								icon="user"
								iconPosition="left"
								label="First Name"
								type="text"
								placeholder="First name"
								onChange={(event) => setFirstName(event.target.value)}
								value={first_name}
								required
							/>

							<Form.Input
								label="Last Name"
								type="text"
								placeholder="Last name"
								onChange={(event) => setLastName(event.target.value)}
								value={last_name}
								required
							/>

							<Form.Input
								label="Email"
								type="email"
								placeholder="User@email.com"
								onChange={(event) => setEmail(event.target.value)}
								value={email}
								required
							/>

							<Checkbox
								label="Temporary Password"
								className={styles.topBottomSpacing}
								onChange={() => setTempPassword(!tempPassword)}
								checked={tempPassword}
							/>

							<Form.Input
								icon="lock"
								iconPosition="left"
								label="Password"
								type="password"
								onChange={(event) => setPassword(event.target.value)}
								className={passwordError && styles.redGlowingBorder}
								value={password}
								required
							/>

							<Form.Input
								icon="lock"
								iconPosition="left"
								label="Confirm Password"
								type="password"
								onChange={(event) => setConfirmPassword(event.target.value)}
								value={confirmPassword}
								className={passwordError && styles.redGlowingBorder}
								required
							/>

							{passwordError && (
								<>
									<h5 className={styles.redText}>{passwordError}</h5>
								</>
							)}
							{pageMessage && (
								<>
									<Message color={pageMessage.color}>
										<Message.Header>{pageMessage.message}</Message.Header>
									</Message>
								</>
							)}

							<div className={styles.center} style={{ width: "300px" }}>
								<Button
									content="Create User"
									onClick={(e) => {
										createUser(e);
									}}
									primary
									className={styles.floatLeft}
									style={{ width: "45%" }}
									loading={buttonLoading}
								/>

								<Button
									content="Clear Form"
									onClick={(e) => {
										e.preventDefault();
										clearForm();
									}}
									standard="true"
									className={styles.floatRight}
									style={{ width: "45%" }}
								/>
							</div>
						</Form>
					</div>
				</>
			)}
		</>
	);
}
