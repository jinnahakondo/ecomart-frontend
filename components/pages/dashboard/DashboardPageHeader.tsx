import React from 'react'

interface Props {
    title: string
    subTitle?: string
    headerBtnContent?: React.ReactNode;
    headerBtnFn?: () => void
}

export default function DashboardPageHeader({
    title,
    subTitle,
    headerBtnContent,
    headerBtnFn
}: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm text-gray-500">
                    {subTitle}
                </p>
            </div>

            {headerBtnContent && (
                <button
                    type="button"
                    onClick={headerBtnFn}
                    className="btn btn-primary gap-2"
                >
                    {headerBtnContent}
                </button>
            )}
        </div>
    )
}