import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateToPastes } from '../../../store/features/pasteSlice'
import { addToPastes } from '../../../store/features/pasteSlice'

const Home = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const pasteId = searchParams.get('pasteId')

    const Dispatch = useDispatch()

    const allPaste = useSelector((state) => state.paste.pastes)
    console.log(allPaste)
    const targetPaste = allPaste.find((p)=>p._id===pasteId)
    console.log(targetPaste)

    const pasteInitialValues = {
       title: targetPaste ? targetPaste.title : '',
       content: targetPaste ? targetPaste.content : '',
    }
    
    const pasteValidationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
    })

    function handlePasteSubmit(values, { resetForm }) {
        // Handle form submission logic here
        console.log('Form submitted with values:', values)
        createPaste(values.title, values.content, { resetForm })
        // resetForm()
    }

    function createPaste(title, content, { resetForm }) {
        const newPaste = {
            _id: pasteId || Date.now().toString(36),
            title: title,
            content: content,
            createdAt: new Date().toISOString(),
        }
        if (pasteId) {
            // Update existing paste logic here
            console.log('Updating paste:', newPaste)
            Dispatch(updateToPastes(newPaste))
        } else {
            // Create new paste logic here
            console.log('Creating new paste:', newPaste)
            Dispatch(addToPastes(newPaste))
        }

        // After Creation or Update 
        resetForm({
            values: {
                title: '',
                content: ''
            }
        });
        setSearchParams({})
    }

    return (
        <>
            <section className="paste-area">
                <div className="container py-5">
                    {/* Header */}
                    <div className="mb-4">
                        <h1 className="paste-title fw-bold">{pasteId ? 'Update Paste' : 'Create Paste'}</h1>
                        <p className="paste-subtitle text-secondary mb-0">
                          {pasteId
                            ? 'Modify and update your existing snippet.'
                            : 'Create, manage, and share snippets effortlessly.'}
                            
                        </p>
                    </div>

                    <Formik
                        initialValues={pasteInitialValues}
                        validationSchema={pasteValidationSchema}
                        onSubmit={handlePasteSubmit}
                    >
                        {({ errors, touched, values }) => (
                            <Form>
                                {/* Paste Title Input Box */}
                                <div className="mb-3">
                                    <Field id="title" name="title" className={`form-control paste-title-input ${errors.title && touched.title ? 'input-error' : ''}`} placeholder="Enter paste title..." />
                                    {errors.title && touched.title ? <div className="form-err-msg">*{errors.title}</div> : null}
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
                                        <Field
                                            as="textarea"
                                            name="content"
                                            className={`form-control editor-textarea ${errors.content && touched.content ? 'input-error' : ''}`}
                                            placeholder="Paste your code or text here..."
                                            spellCheck="false"
                                        />
                                    </div>

                                    {/* Bottom Status Bar */}
                                    <div className="editor-footer d-flex justify-content-between align-items-center px-3 py-2">
                                        <span>{values.content?.length || 0} characters</span>
                                        <span>{new Blob([values.content || '']).size} B</span>
                                    </div>
                                </div>
                                {errors.content && touched.content ? <div className="form-err-msg">*{errors.content}</div> : null}


                                {/* Bottom Right Button */}
                                <div className="d-flex justify-content-end mt-4">
                                    <button type="submit" className="btn btn-action-bottom">
                                        {pasteId ? (
                                            'Update Paste'
                                        ) : (
                                            <>
                                                <i className="fa-regular fa-copy fs-5 me-2"></i> Create Paste
                                            </>
                                        )}
                                    </button>
                                </div>
                            </Form>
                        )}

                    </Formik>




                </div>
            </section>
        </>
    )
}

export default Home
