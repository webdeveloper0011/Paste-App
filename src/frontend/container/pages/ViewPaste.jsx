import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewPaste = () => {

    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes)
    console.log(allPastes)

    const paste = allPastes.filter((p) => p._id === id)
    console.log(paste)

    return (
        <>
            <section className="view-paste-area ">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="view-paste-content">
                                <div className="mb-4">
                                    <h1 className="paste-title fw-bold">View Paste : Id- {id}</h1>
                                    <p className="paste-subtitle text-secondary mb-0">
                                        Create, manage, and share snippets effortlessly.
                                    </p>
                                </div>
                            </div>
                            {/* Paste Title Input Box */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control paste-title-input"
                                    value={paste[0].title}
                                    readOnly
                                />
                            </div>

                            {/* Editor Box */}
                            <div className="editor-window">
                                {/* Top Window Bar (Soft Lavender Header) */}
                                <div className="editor-topbar d-flex align-items-center justify-content-between px-3">
                                    {/* macOS Traffic Dots */}
                                    <div className="window-dots d-flex align-items-center gap-2">
                                        <span className="dot dot-close"></span>
                                        <span className="dot dot-minimize"></span>
                                        <span className="dot dot-expand"></span>
                                    </div>

                                    {/* Copy Icon Button (Static) */}
                                    <button
                                        type="button"
                                        className="copy-btn border-0 bg-transparent text-secondary p-1 rounded"
                                        aria-label="Copy code"
                                        onClick={()=>{navigator.clipboard.writeText(paste[0].content);
                                            toast.success('Content copied to clipboard!')}
                                        }
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </button>
                                </div>

                                {/* Text Editor Area */}
                                <div className="editor-body">
                                    <textarea
                                        className="form-control editor-textarea"
                                        value={paste[0].content}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ViewPaste
