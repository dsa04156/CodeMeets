package com.hypeboy.codemeets.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;

@RestController
@RequestMapping("/file")
public class FileController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Value("${file.images-dir}")
    private String imagesFolder;

	private final String imageDirectory = Paths.get("").toAbsolutePath() + "";

	public FileController() {
		File file = new File(imageDirectory);
		if (!file.exists()) {
			file.mkdirs();
		}
	}

	private String getExtension(MultipartFile multipartFile) {
		String fileName = multipartFile.getOriginalFilename();
		int index = fileName.indexOf(".");
		if (index > -1) {
			return fileName.substring(index);
		}
		return "";
	}
	@Operation(summary = "Get And Show Image", description = "서버에 올라온 이미지 확인 or 다운로드"
			+ "img src 태그에 값을 넣어서 확인바랍니다")
	@GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> image(@PathVariable String fileName) throws FileNotFoundException {
		String filePath = imageDirectory + imagesFolder + fileName;
		logger.info("filePath - " + filePath);
		
        InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(filePath));
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(inputStreamResource);
    }
	
	@Operation(summary = "Get Image File List", description = "저장된 이미지 이름 리스트 요청")
	@GetMapping
	public List<String> getFileNames() {
		return Stream.of(new File(imageDirectory + imagesFolder).listFiles()).filter(file -> !file.isDirectory()).map(File::getName)
				.collect(Collectors.toList());
	}
	
	@Operation(summary = "Upload File", description = "파일을 서버에 업로드")
	@PostMapping(consumes = "multipart/form-data")
	public ResponseEntity<Object> uploadFiles(
	    @Parameter(
	        description = "Files to be uploaded", 
	        content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
	    )
	    @RequestPart (value = "files", required = true) MultipartFile[] multipartFiles)
	        throws NoSuchAlgorithmException, IOException {
		String dbfilename = null;

		for (MultipartFile multipartFile : multipartFiles) {
			dbfilename = UUID.randomUUID() + getExtension(multipartFile);
			String filePath = imageDirectory + imagesFolder + dbfilename;	
			logger.info("파일 저장 위치 - " + filePath);
			
			try (FileOutputStream writer = new FileOutputStream(filePath)) {
				writer.write(multipartFile.getBytes());
			} catch (Exception e) {
				logger.info(e.getMessage(), e);
				throw new RuntimeException("Fail to upload files.");
			}
		}
		return new ResponseEntity<Object>(dbfilename, HttpStatus.OK);
	}
}