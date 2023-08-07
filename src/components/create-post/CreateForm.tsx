import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useRef, RefObject } from "react";

interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a description.") //can add min/max for characters
    })

    const { 
        register, 
        handleSubmit, 
        formState: {errors
        }} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");
    const formRef: RefObject<HTMLFormElement> = useRef(null);

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            //use ^^^ instead of vvv
            // title: data.title,
            // description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        });
        formRef.current?.reset();
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title..." {...register("title")}/>
            <p style={{ color: "red" }}>{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")}/>
            <p style={{ color: "red" }}>{errors.description?.message}</p>
            <input type="submit" />
        </form>
    )
}