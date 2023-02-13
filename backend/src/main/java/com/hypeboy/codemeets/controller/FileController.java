package com.hypeboy.codemeets.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;

@RestController
@RequestMapping("/api/file")
@Api(tags = "파일 업로드 API")
public class FileController {
	private final Logger logger = LoggerFactory.getLogger(FileController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Value("${file.images-dir}")
    private String imagesFolder;
	
	@Value("${file.notice-dir}")
	private String noticeFolder;

	private final String fileDirectory = Paths.get("").toAbsolutePath() + "";

	public FileController() {		
		File file = null;
		
		List<String> folderList = new ArrayList<>();
		folderList.add("/images/");
		folderList.add("/notice/");
		
		for (String folder : folderList) {
			String filePath = fileDirectory + folder;
			file = new File(filePath);
			logger.info(file.toString());
			
			if (!file.exists()) {
				file.mkdirs();
			}
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
	
	@Operation(summary = "이미지 확인 및 다운로드", description = "서버에 올라온 이미지 확인 or 다운로드 "
			+ " \n img src 태그에 값을 넣어서 확인바랍니다")
	@GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> getImageFile(@PathVariable String fileName) throws FileNotFoundException {
		String filePath = fileDirectory + imagesFolder + fileName;
		logger.info("filePath - " + filePath);
		
        InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(filePath));
        
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(inputStreamResource);
    }
	
	@Operation(summary = "공지 파일 확인 및 다운로드", description = "서버에 올라온 공지 파일 확인 or 다운로드")
	@GetMapping("/notice/{fileName}")
    public ResponseEntity<Resource> getNoticeFile(@PathVariable String fileName) throws FileNotFoundException {
		String filePath = fileDirectory + noticeFolder + fileName;
		logger.info("filePath - " + filePath);
		
        InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(filePath));
        
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(inputStreamResource);
    }
	
	@Operation(summary = "이미지 파일 리스트 요청", description = "서버에 저장된 이미지 이름 목록 획득")
	@GetMapping("images/list")
	public List<String> getImageFileNames() {
		
		return Stream.of(new File(fileDirectory + imagesFolder).
				listFiles()).filter(file -> !file.isDirectory()).map(File::getName)
				.collect(Collectors.toList());
	}

	@Operation(summary = "공지 파일 리스트 요청", description = "서버에 저장된 공지 파일 이름 목록 획득")
	@GetMapping("/notice/list")
	public List<String> getNoticeFileNames() {
		
		return Stream.of(new File(fileDirectory + noticeFolder).
				listFiles()).filter(file -> !file.isDirectory()).map(File::getName)
				.collect(Collectors.toList());
	}
	
	@Operation(summary = "이미지 파일 업로드", description = "이미지 파일을 서버에 업로드 "
			+ " \n 랜덤 uuid값을 획득")
	@PostMapping(value="/images", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImageFiles(
		    @Parameter(
			        description = "Files to be uploaded",
			        content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
			    )
		    @RequestPart (value = "files", required = true) MultipartFile[] multipartFiles,
			@RequestParam("files") List<MultipartFile> files) {
		String dbfilename = null;

		for (MultipartFile multipartFile : files) {
			dbfilename = UUID.randomUUID() + getExtension(multipartFile);
			String filePath = fileDirectory + imagesFolder + dbfilename;
			logger.info("파일 저장 위치 - " + filePath);

			try (FileOutputStream writer = new FileOutputStream(filePath)) {
				writer.write(multipartFile.getBytes());
			} catch (Exception e) {
				logger.info(e.getMessage(), e);
				 
				return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		return new ResponseEntity<String>(dbfilename, HttpStatus.OK);
	}
	
	@Operation(summary = "공지 파일 업로드", description = "공지 파일을 서버에 업로드 "
			+ " \n 랜덤 uuid값을 획득")
	@PostMapping(value="/notice", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadNoticeFiles(
		    @Parameter(
			        description = "Files to be uploaded",
			        content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
			    )
		    @RequestPart (value = "files", required = true) MultipartFile[] multipartFiles,
			@RequestParam("files") List<MultipartFile> files) {
		String dbfilename = null;

		for (MultipartFile multipartFile : files) {
			dbfilename = UUID.randomUUID() + getExtension(multipartFile);
			String filePath = fileDirectory + noticeFolder + dbfilename;
			logger.info("파일 저장 위치 - " + filePath);

			try (FileOutputStream writer = new FileOutputStream(filePath)) {
				writer.write(multipartFile.getBytes());
			} catch (Exception e) {
				logger.info(e.getMessage(), e);
				 
				return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		return new ResponseEntity<String>(dbfilename, HttpStatus.OK);
	}
	
}
