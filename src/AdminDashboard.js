import React, { useState } from 'react';
import './App.css';

const AdminDashboard = ({ users, onAddUser, onUpdateUser, onDeleteUser, onLogout }) => {
    const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });
    const [editingId, setEditingId] = useState(null);
    const [editUser, setEditUser] = useState({ email: '', password: '', role: 'user' });

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUser.email && newUser.password) {
            onAddUser(newUser.email, newUser.password, newUser.role);
            setNewUser({ email: '', password: '', role: 'user' });
        }
    };

    const startEditing = (user) => {
        setEditingId(user.id);
        setEditUser({ email: user.email, password: '', role: user.role });
    };

    const saveEdit = (e) => {
        e.preventDefault();
        onUpdateUser(editingId, editUser);
        setEditingId(null);
        setEditUser({ email: '', password: '', role: 'user' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditUser({ email: '', password: '', role: 'user' });
    };

    return (
        <div className="SignUpPage">
            <div className="Header">
                <div className="Logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="42" viewBox="0 0 44 42" fill="none">
                        <path
                            d="M22.8347 0.0168568C11.2114 -0.443407 1.41531 8.57812 0.953674 20.167C0.492043 31.7576 9.54037 41.5246 21.1654 41.9831C32.7887 42.4434 42.5848 33.4219 43.0464 21.833C43.508 10.2442 34.4579 0.475371 22.8347 0.0168568ZM31.7268 30.781C31.5615 31.0698 31.2881 31.2813 30.9666 31.3692C30.6451 31.4572 30.3017 31.4143 30.0119 31.2501C27.2272 29.6703 24.1667 28.6327 20.9934 28.1927C17.8216 27.7436 14.5932 27.8998 11.4799 28.653C11.1622 28.7145 10.8329 28.6515 10.5606 28.4773C10.2882 28.303 10.0936 28.0308 10.0172 27.7173C9.94082 27.4037 9.98855 27.0728 10.1505 26.7934C10.3124 26.514 10.576 26.3076 10.8867 26.2169C14.3094 25.3874 17.8287 25.2176 21.3444 25.7094C24.8602 26.2029 28.1952 27.3334 31.2564 29.0695C31.4 29.1511 31.5261 29.2601 31.6274 29.3902C31.7288 29.5204 31.8034 29.6692 31.8471 29.8281C31.8908 29.9871 31.9027 30.153 31.882 30.3165C31.8614 30.48 31.8086 30.6379 31.7268 30.781ZM34.4948 25.2684C34.3929 25.4568 34.2547 25.6233 34.0881 25.7584C33.9216 25.8935 33.7299 25.9945 33.5242 26.0556C33.3184 26.1167 33.1026 26.1368 32.889 26.1146C32.6755 26.0924 32.4684 26.0285 32.2797 25.9264C29.0188 24.1687 25.4687 23.007 21.7973 22.4963C18.1269 21.9782 14.3931 22.1193 10.7726 22.9128C10.5628 22.9592 10.3459 22.9638 10.1343 22.9264C9.92272 22.889 9.72063 22.8104 9.53962 22.6949C9.3586 22.5795 9.20223 22.4295 9.07947 22.2537C8.9567 22.0779 8.86997 21.8796 8.82423 21.6703C8.77772 21.4611 8.77308 21.2449 8.81058 21.0339C8.84809 20.8229 8.92699 20.6215 9.04278 20.441C9.15856 20.2605 9.30894 20.1046 9.4853 19.9822C9.66165 19.8598 9.86051 19.7733 10.0705 19.7277C14.0707 18.8494 18.1966 18.6941 22.2519 19.2692C26.3092 19.8309 30.2324 21.1142 33.8348 23.0581C34.6282 23.4868 34.9231 24.4756 34.4948 25.2684ZM37.563 19.0539C37.3165 19.5258 36.8923 19.8807 36.3834 20.0409C35.8746 20.201 35.3229 20.1532 34.8494 19.908C31.0521 17.9396 26.9454 16.6328 22.7065 16.0438C18.4689 15.4446 14.1598 15.5719 9.96514 16.4201C9.4453 16.5186 8.90745 16.409 8.46813 16.1149C8.02882 15.8208 7.72344 15.3659 7.61815 14.8489C7.51287 14.3318 7.61616 13.7943 7.90566 13.3526C8.19515 12.911 8.64752 12.6009 9.16475 12.4895C13.807 11.55 18.5762 11.408 23.2665 12.0695C27.9581 12.7224 32.5035 14.1695 36.7064 16.3484C37.6911 16.8594 38.0755 18.0704 37.563 19.0539Z"
                            fill="white" />
                    </svg>
                </div>
                <div className="HeadingText">Admin Dashboard</div>
            </div>

            <div className="Middle">
                <h2 style={{ color: 'white', textAlign: 'center' }}>User Management</h2>

                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table style={{ width: '100%', color: 'white', margin: '20px 0', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <td style={{ padding: '12px' }}>{user.email}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '3px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            backgroundColor: user.role === 'admin' ? '#1ed760' : '#535353',
                                            color: user.role === 'admin' ? '#000' : 'white'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        {editingId === user.id ? (
                                            <>
                                                <button
                                                    onClick={saveEdit}
                                                    style={{
                                                        marginRight: '8px',
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        border: 'none',
                                                        backgroundColor: '#1ed760',
                                                        color: '#000',
                                                        cursor: 'pointer',
                                                        fontFamily: '"Spotify Mix UI"',
                                                        fontWeight: '700'
                                                    }}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        border: 'none',
                                                        backgroundColor: '#535353',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        fontFamily: '"Spotify Mix UI"',
                                                        fontWeight: '700'
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => startEditing(user)}
                                                    style={{
                                                        marginRight: '8px',
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        border: 'none',
                                                        backgroundColor: '#1ed760',
                                                        color: '#000',
                                                        cursor: 'pointer',
                                                        fontFamily: '"Spotify Mix UI"',
                                                        fontWeight: '700'
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => onDeleteUser(user.id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        border: 'none',
                                                        backgroundColor: '#e91429',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        fontFamily: '"Spotify Mix UI"',
                                                        fontWeight: '700'
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {editingId && (
                    <div style={{
                        backgroundColor: 'rgba(30, 215, 96, 0.1)',
                        padding: '20px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid rgba(30, 215, 96, 0.3)'
                    }}>
                        <h3 style={{ color: '#1ed760', marginTop: 0 }}>Edit User</h3>
                        <form onSubmit={saveEdit}>
                            <div className="Form">
                                <input
                                    type="email"
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                    placeholder="Email"
                                    className="FormInput"
                                    required
                                />
                            </div>
                            <div className="Form" style={{ marginTop: '10px' }}>
                                <input
                                    type="password"
                                    value={editUser.password}
                                    onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                                    placeholder="New Password (leave blank to keep current)"
                                    className="FormInput"
                                />
                            </div>
                            <div className="Form" style={{ marginTop: '10px' }}>
                                <select
                                    value={editUser.role}
                                    onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                    className="FormInput"
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        border: 'none',
                                        width: '100%'
                                    }}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{
                    backgroundColor: 'rgba(30, 215, 96, 0.1)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid rgba(30, 215, 96, 0.3)'
                }}>
                    <h2 style={{ color: '#1ed760', marginTop: 0 }}>Add New User</h2>
                    <form onSubmit={handleAddUser}>
                        <div className="Form">
                            <input
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                placeholder="Email"
                                className="FormInput"
                                required
                            />
                        </div>
                        <div className="Form" style={{ marginTop: '10px' }}>
                            <input
                                type="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                placeholder="Password"
                                className="FormInput"
                                required
                            />
                        </div>
                        <div className="Form" style={{ marginTop: '10px' }}>
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                className="FormInput"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    border: 'none',
                                    width: '100%'
                                }}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="GreenButton" style={{ marginTop: '10px' }}>
                            <div className="TextBold">Add User</div>
                        </button>
                    </form>
                </div>

                <button onClick={onLogout} className="GreenButton">
                    <div className="TextBold">Log Out</div>
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;