import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes, resetAllPastes } from '../../../store/features/pasteSlice'
import { SquarePen, Trash2, Eye, Copy, Calendar, X, FileText } from 'lucide-react';
import Swal from 'sweetalert2';

const AllPastes = () => {

    const [searchItem, setSearchItem] = useState('')

    const Dispatch = useDispatch()
    const navigate = useNavigate();

    const allPastes = useSelector((state) => state.paste.pastes)
    // console.log('All Pastes from Redux Store:', allPastes)

    const filteredPastes = allPastes.filter((paste) => {
        return paste?.title?.toLowerCase().includes(searchItem.toLowerCase());
    });

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    function handleDeletePaste(pasteId) {
        Dispatch(removeFromPastes(pasteId))
    }

    function handleCopyContent(pasteId) {
        const targetPaste = allPastes.find((p) => p._id === pasteId);
        // console.log('Target Paste:', targetPaste.content);
        navigator.clipboard.writeText(targetPaste.content);
        toast.success('Content copied to clipboard!');
    }

    function handleViewPaste(pasteId) {
        const targetPaste = allPastes.find((p) => p._id === pasteId);
        navigate(`/view-paste/${targetPaste._id}`);
    }

    function handleEdit(pasteId) {
        const targetPaste = allPastes.find((p) => p._id === pasteId);
        navigate(`/?pasteId=${pasteId}`)
    }

    function handleClearAll() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! All pastes will be deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, clear all!'
        }).then((result) => {
            if (result.isConfirmed) {
                Dispatch(resetAllPastes());
                Swal.fire({
                    title: 'Deleted!',
                    text: 'All pastes have been cleared.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }

    return (
        <>
            <div className="container py-5 all-pastes-wrapper">
                {/* Top Search Bar */}
                <div className="search-bar-box mb-4">
                    <div className="search-input-wrapper position-relative">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search pastes by title or content..."
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
                        />
                        <button type="button" className="search-clear-btn" aria-label="Clear search">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

                {/* Main Container Card */}
                <div className="pastes-main-card">
                    {/* Header Section */}
                    <div className="pastes-card-header mb-4">
                        <h2 className="pastes-main-heading fw-bold mb-1">All Pastes</h2>
                        <p className="pastes-subheading text-secondary mb-0">
                            {filteredPastes.length === 0
                                ? 'Create your first paste to get started'
                                : `Showing ${filteredPastes.length} total pastes`}
                        </p>
                    </div>

                    {/* Filter Data  */}
                    {
                        filteredPastes.length > 0 ? (
                            <>
                                <div className="pastes-list d-flex flex-column gap-3">
                                    {filteredPastes.map((item, index) => (
                                        <div key={index} className="paste-item-card mt-2">
                                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
                                                {/* Left: Title & Snippet Content */}
                                                <div className="paste-info">
                                                    <h3 className="paste-item-title fw-bold">{item.title}</h3>
                                                    <p className="paste-item-content text-secondary mb-0">{item.content}</p>
                                                </div>

                                                {/* Right: Actions & Date */}
                                                <div className="paste-actions-block d-flex flex-column align-items-md-end gap-2">
                                                    {/* Action Icon Buttons */}
                                                    <div className="action-buttons-group d-flex align-items-center gap-1">
                                                        {/* Edit */}
                                                        <button type="button" className="btn-icon-action" title="Edit paste" onClick={() => handleEdit(item._id)}>
                                                            <SquarePen size={15} />
                                                        </button>

                                                        <button type="button" className="btn-icon-action delete-hover" title="Delete paste" onClick={() => handleDeletePaste(item._id)}>
                                                            <Trash2 size={15} />
                                                        </button>

                                                        <button type="button" className="btn-icon-action" title="View paste" onClick={() => handleViewPaste(item._id)}>
                                                            <Eye size={15} />
                                                        </button>

                                                        <button type="button" className="btn-icon-action" title="Copy content" onClick={() => handleCopyContent(item._id)}>
                                                            <Copy size={15} />
                                                        </button>
                                                    </div>

                                                    {/* Creation Date */}
                                                    <div className="paste-date-meta d-flex align-items-center gap-1 text-secondary">
                                                        <i className="fa-regular fa-calendar"></i>
                                                        <span>{dateFormatter(item.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                                {/* Bottom Right Button */}
                                <div className="d-flex justify-content-end mt-4">
                                    <button type="button" className="btn btn-action-bottom red-btn" onClick={handleClearAll}>
                                        Clear All Paste
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* State 2: When there are no pastes */
                            <div className="empty-state-box text-center py-5">
                                <div className="empty-state-icon mx-auto mb-3">
                                    <FileText size={32} />
                                </div>
                                <h3 className="empty-state-title fw-bold mb-2">No pastes yet</h3>
                                <p className="empty-state-text text-secondary mb-0">
                                    Create your first paste to share code snippets or text.
                                </p>
                            </div>
                        )
                    }
                </div>

            </div>

        </>
    )
}

export default AllPastes
