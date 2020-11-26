import React from "react";

export default ({msg}) => {
    return (
        <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog"
             aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    {msg}
                </div>
            </div>
        </div>
    )
}