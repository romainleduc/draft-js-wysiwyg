import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export interface MediaUploadControlProps extends ButtonProps {
    /** The HTML for attribute for associating the label with an input */
    htmlFor?: string;
    onChangeFiles: (files: FileList) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    insertOnChange?: boolean;
}

const MediaUploadControl = forwardRef<
    HTMLLabelElement,
    MediaUploadControlProps
>(
    (
        {
            children,
            inputProps,
            htmlFor,
            onChangeFiles,
            ...props
        }: MediaUploadControlProps,
        ref
    ) => {
        const id = inputProps && inputProps.id;

        if (id && htmlFor) {
            console.log('htmlFor is ignored');
        }

        if (!id && !htmlFor) {
            console.log('id required');
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;

            if (files) {
                onChangeFiles(files);
            }
        };

        return (
            <label htmlFor={id || htmlFor}>
                <input
                    id={id || htmlFor}
                    style={{ display: 'none' }}
                    type="file"
                    onChange={handleChange}
                    {...inputProps}
                />
                <Button ref={ref} component="span" {...props}>
                    {children}
                </Button>
            </label>
        );
    }
);

MediaUploadControl.displayName = 'MediaUploadControl';

export default MediaUploadControl;
