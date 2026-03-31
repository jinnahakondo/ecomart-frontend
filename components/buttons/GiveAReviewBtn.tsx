"use client";
import React from "react";


export default function GiveAReviewBtn({ openModal }: { openModal: () => void }) {


    return (
        <button
            className="btn btn-primary"
            onClick={openModal}
        >
            Give A Review
        </button>
    );
}