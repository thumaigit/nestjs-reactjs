import React, { useState } from 'react';

export const Login = ({ handleSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Login</h2>
            <form>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '10px 20px' }} onClick={(e) => handleSubmit(username, password, e)}>Login</button>
            </form>
        </div>
    );
};
