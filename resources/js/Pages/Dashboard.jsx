import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-white leading-tight">Patient Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 glass-medical-gradient min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Welcome Section */}
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden shadow-xl sm:rounded-3xl p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h3 className="text-3xl font-extrabold text-white">Hello, {auth.user.name}!</h3>
                                <p className="text-cyan-50 mt-2 text-lg">Manage your clinic reservations and medical history.</p>
                            </div>
                            <Link
                                href={route('dashboard')} // Later we will change this to appointments.create
                                className="px-8 py-4 bg-white text-clinic-secondary font-bold rounded-2xl shadow-lg hover:bg-cyan-50 transition-all active:scale-95 uppercase tracking-wider text-sm"
                            >
                                + Book New Appointment
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Upcoming', value: '2', icon: '📅', color: 'bg-blue-500/20' },
                            { label: 'Completed', value: '12', icon: '✅', color: 'bg-emerald-500/20' },
                            { label: 'Cancelled', value: '0', icon: '❌', color: 'bg-red-500/20' },
                        ].map((stat, i) => (
                            <div key={i} className={`${stat.color} backdrop-blur-md border border-white/20 p-6 rounded-3xl flex items-center gap-4 shadow-lg`}>
                                <span className="text-4xl">{stat.icon}</span>
                                <div>
                                    <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Appointments Table */}
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl sm:rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-white/20">
                            <h4 className="text-xl font-bold text-white">Your Upcoming Reservations</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/10 text-white uppercase text-xs tracking-widest">
                                        <th className="p-4 font-semibold">Doctor</th>
                                        <th className="p-4 font-semibold">Specialty</th>
                                        <th className="p-4 font-semibold">Date & Time</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white divide-y divide-white/10">
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium">Dr. Maria Santos</td>
                                        <td className="p-4 text-cyan-100">Cardiology</td>
                                        <td className="p-4">Feb 25, 2026 - 10:00 AM</td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-yellow-400/30 border border-yellow-400/50 text-yellow-100 rounded-full text-xs font-bold uppercase">Pending</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-white/60 hover:text-white transition-colors underline text-sm">Cancel</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium">Dr. Juan Dela Cruz</td>
                                        <td className="p-4 text-cyan-100">General Medicine</td>
                                        <td className="p-4">Mar 02, 2026 - 02:30 PM</td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-emerald-400/30 border border-emerald-400/50 text-emerald-100 rounded-full text-xs font-bold uppercase">Confirmed</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-white/60 hover:text-white transition-colors underline text-sm">Cancel</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}