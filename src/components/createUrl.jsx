import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { QRCode } from 'react-qrcode-logo';
import { UrlState } from '@/context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from './ui/card'
import * as yup from 'yup';
import useFetch from '@/hooks/api-fetch'
import { createUrl } from '@/db/apiurls'

function CreateUrl() {
    const { user } = UrlState();
    const navigate = useNavigate()
    const ref = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get('CreateNew');
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        title: '',
        longUrl: longLink ? longLink : '',
        customUrl: '',
    })
    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        longUrl: yup.string().url('Invalid URL').required('Long URL is required'),
        customUrl: yup.string(),
    });
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };


    const {
        data,
        error,
        loading,
        fn: fnCreateUrl,
    } = useFetch(createUrl);

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`)
        }
    }, [error, data]);

    const createNewLink = async (e) => {
        e.preventDefault();

        try {
            await schema.validate(formValues, {
                abortEarly: false,
            });

            const canvas = ref.current.querySelector("canvas");

            const blob = await new Promise((resolve) =>
                canvas.toBlob(resolve)
            );

            const response = await fnCreateUrl({
                ...formValues,
                user_id: user.id,
                qrcode: blob,
            });

            navigate(`/link/${response[0].id}`);
        } catch (err) {
            console.log(err);
            setErrors(err.inner || []);
        }
    };
    return (
        <Dialog defultOpen={longLink ? true : false}
            onOpenChange={(res) => { if (!res) setSearchParams({}) }}
        >
            <form>
                <DialogTrigger render={<Button className={"inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-100"} variant="outline">Create Link</Button>} />
                <DialogContent className="sm:max-w-sm text-white">
                    <DialogHeader>
                        <DialogTitle>Create Link</DialogTitle>
                    </DialogHeader>

                    {formValues.longUrl && (
                        <div ref={ref}>
                            <QRCode
                                value={formValues.longUrl}
                                size={200}
                            />
                        </div>
                    )}
                    <Field>
                        <Label htmlFor="title1">title</Label>
                        <Input id="title"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                            placeholder="Write title"
                        />


                    </Field>
                    <Field>
                        <Label htmlFor="longurl">longUrl</Label>
                        <Input id="longUrl"
                            name="longUrl"
                            value={formValues.longUrl}
                            onChange={handleChange}
                            placeholder="Enter long URL"
                        />

                    </Field>
                    <Field>
                        <Label htmlFor="Customlink">Custom Link </Label>
                        <div className="flex items-center space-x-2">
                            <Card className="p-2">
                                linkzip.in
                            </Card>
                            <Input
                                id="customUrl"
                                value={formValues.customUrl}
                                onChange={handleChange}
                                placeholder="Custom Link (Optional)"
                            />
                        </div>


                    </Field>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={createNewLink}
                        >
                            {loading ? "Creating..." : "Create Link"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
export default CreateUrl

