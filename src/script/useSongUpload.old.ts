// Song Mutation function when editing the song
  // const SongMutation = useMutation({
  //   mutationFn: (formData: FormData) => {
  //     if (isEdit && songId) {
  //       return artistApi.updateSong(songId, formData);
  //     } else {
  //       return artistApi.uploadSong(formData);
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["songs"] });
  //     navigate("/artist/songs");
  //   },
  //   onError: (error) => {
  //     console.error("song mutation error", error);
  //   },
  // });

  // submit edit/ upload function
  // const Onsubmit: SubmitHandler<SongUploadData> = async (data) => {
  //   const formData = new FormData();

  //   if (isEdit) formData.append("songId", songId!);

  //   formData.append("title", data.title);
  //   formData.append("description", data.description || "");
  //   formData.append("genre", data.genre);
  //   formData.append("tags", data.tags);

  //   if (data.coverImage instanceof File) formData.append("coverImage", data.coverImage);
  //   if (data.trackFile instanceof File) formData.append("trackFile", data.trackFile);
  //   if (data.lrcFile instanceof File) formData.append("lrcFile", data.lrcFile);

  //   SongMutation.mutate(formData);
  // };
