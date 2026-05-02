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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight text-base-content">{title}</h1>
                {subTitle ? (
                    <p className="text-sm text-base-content/60 mt-2 max-w-2xl">
                        {subTitle}
                    </p>
                ) : null}
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